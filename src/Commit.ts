import * as core from "@actions/core";
import { exec, ExecOptions } from "@actions/exec";
import { ActionContext } from "./ActionContext";

export const commit = async (
    filesToCommit: string[],
    actionContext: ActionContext,
    message: string,
    githubToken: string
): Promise<void> => {
    try {
        core.info(`Committing changes with message "${message}".`);
        const remoteRepository = `https://${actionContext.githubActor}:${githubToken}@github.com/${actionContext.githubRepository}.git`;
        core.debug("head commit: ");
        core.debug(JSON.stringify(actionContext.sha));
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const tempBranch = `bump_tmp_${actionContext.sha}`;

        const options = {
            cwd: process.cwd(),
            listeners: {
                stdline: core.debug,
                stderr: core.debug,
                debug: core.debug
            }
        } as unknown as ExecOptions;

        core.info("git status");
        await exec("git", ["status"], options);

        core.info(`git config user.name "majora2007"`);
        await exec("git", ["config", "user.name", `"majora2007"`], options);

        core.info(`git config user.email "josephmajora@gmail.com"`);
        await exec("git", ["config", "user.email", `"josephmajora@gmail.com"`], options);

        // Issue #10
        // While Git was updated from 2.33.0 to 2.33.1, need to specify how to reconcile divergent branches.
        core.info(`git config pull.rebase false`);
        await exec("git", ["config", "pull.rebase", `false`], options);

        core.info(`git remote add publisher ${remoteRepository}`);
        await exec("git", ["remote", "add", "publisher", remoteRepository], options);

        core.info(`git branch ${tempBranch}`);
        await exec("git", ["branch", tempBranch], options);

        core.info(`git merge ${actionContext.branch}`);
        await exec("git", ["merge", actionContext.branch], options);

        // Issue #5
        // Only commit changed files
        for (const file of filesToCommit) {
            core.info(`git add "${file}"`);
            await exec("git", ["add", file], options);
        }

        core.info("git status");
        await exec("git", ["status"], options);

        try {
            core.info(`git commit -m "${message}"`);
            await exec("git", ["commit", "-m", `${message}`], options);
        } catch (error: unknown) {
            if (error instanceof Error) {
                core.warning(`Warning: git commit failed. The error message is ${error.message}`);
                core.warning(`Warning: git push will be skipped.`);
            }
            return;
        }

        core.info(`git checkout ${actionContext.branch}`);
        await exec("git", ["checkout", actionContext.branch], options);

        core.info(`git pull --no-edit --commit --strategy-option theirs publisher ${actionContext.branch}`);
        await exec(
            "git",
            ["pull", "--no-edit", "--commit", "--strategy-option", "theirs", "publisher", actionContext.branch],
            options
        );

        core.info(`git merge ${tempBranch}`);
        await exec("git", ["merge", tempBranch], options);

        core.info(`git push publisher ${actionContext.branch}`);
        await exec("git", ["push", "publisher", actionContext.branch], options);
    } catch (error: unknown) {
        if (error instanceof Error) {
            core.error(error.message);
            core.setFailed(error.message);
        }

        process.exit(1);
    }
};
