"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionContext = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const os_1 = require("os");
class ActionContext {
    constructor(githubContext) {
        this._githubContext = githubContext;
        core.debug("///    githubContext:");
        core.debug("///    " + JSON.stringify(this._githubContext));
        core.debug("");
        if (process.env.GITHUB_EVENT_PATH != null) {
            if (fs.existsSync(process.env.GITHUB_EVENT_PATH)) {
                let githubEvent = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));
                core.debug("///    githubEvent:");
                core.debug("///    " + JSON.stringify(githubEvent));
                core.debug("");
                this._payload = githubEvent;
            }
            else {
                const eventPath = process.env.GITHUB_EVENT_PATH;
                process.stdout.write(`GITHUB_EVENT_PATH ${eventPath} does not exist${os_1.EOL}`);
                throw new Error(`GITHUB_EVENT_PATH ${eventPath} does not exist${os_1.EOL}`);
            }
        }
    }
    get eventName() {
        return this._githubContext.eventName;
    }
    get sha() {
        return this._githubContext.sha;
    }
    get ref() {
        return this._githubContext.ref;
    }
    get githubActor() {
        var _a;
        return (_a = process.env.GITHUB_ACTOR) !== null && _a !== void 0 ? _a : "";
    }
    get githubRepository() {
        var _a;
        return (_a = process.env.GITHUB_REPOSITORY) !== null && _a !== void 0 ? _a : "";
    }
    get githubWorkspace() {
        var _a;
        return (_a = process.env.GITHUB_REPOSITORY) !== null && _a !== void 0 ? _a : "";
    }
    get branch() {
        var _a;
        // "ref":"refs/heads/master"
        return (_a = process.env.BRANCH) !== null && _a !== void 0 ? _a : this.ref.substring("refs/heads/".length);
    }
    get headCommit() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        if (this._githubContext.action === "closed") {
            core.debug("id: " + this.sha);
            return {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-explicit-any
                id: (_a = this.sha.toString()) !== null && _a !== void 0 ? _a : "",
                message: "",
                timestamp: "",
                url: "",
                committerEmail: "",
                committerName: "",
                committerUserName: ""
            };
        }
        return {
            id: (_c = (_b = this._payload) === null || _b === void 0 ? void 0 : _b.head_commit.id.toString()) !== null && _c !== void 0 ? _c : "",
            message: (_e = (_d = this._payload) === null || _d === void 0 ? void 0 : _d.head_commit.message.toString()) !== null && _e !== void 0 ? _e : "",
            timestamp: (_g = (_f = this._payload) === null || _f === void 0 ? void 0 : _f.head_commit.timestamp.toString()) !== null && _g !== void 0 ? _g : "",
            url: (_j = (_h = this._payload) === null || _h === void 0 ? void 0 : _h.head_commit.url.toString()) !== null && _j !== void 0 ? _j : "",
            committerName: (_l = (_k = this._payload) === null || _k === void 0 ? void 0 : _k.head_commit.committer.name.toString()) !== null && _l !== void 0 ? _l : "",
            committerEmail: (_o = (_m = this._payload) === null || _m === void 0 ? void 0 : _m.head_commit.committer.email.toString()) !== null && _o !== void 0 ? _o : "",
            committerUserName: (_q = (_p = this._payload) === null || _p === void 0 ? void 0 : _p.head_commit.committer.username.toString()) !== null && _q !== void 0 ? _q : ""
        };
    }
    get pusher() {
        var _a, _b, _c, _d, _e, _f, _g;
        // If type is pull_request and close event
        if (this._githubContext.action === "closed") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            const mergedBy = (_b = (_a = this._githubContext) === null || _a === void 0 ? void 0 : _a.pull_request) === null || _b === void 0 ? void 0 : _b.merged_by;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const name = (_c = mergedBy === null || mergedBy === void 0 ? void 0 : mergedBy.login) !== null && _c !== void 0 ? _c : "";
            return {
                name,
                email: ""
            };
        }
        return {
            name: (_e = (_d = this._payload) === null || _d === void 0 ? void 0 : _d.pusher.name.toString()) !== null && _e !== void 0 ? _e : "",
            email: (_g = (_f = this._payload) === null || _f === void 0 ? void 0 : _f.pusher.email.toString()) !== null && _g !== void 0 ? _g : ""
        };
    }
}
exports.ActionContext = ActionContext;
/*
githubContext Sample:
{"payload":{"after":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","base_ref":null,"before":"c2fda8bea4f16380125475e972adbfc0b0eead18","commits":[{"author":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"committer":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"distinct":true,"id":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","message":"Update workflow config file","timestamp":"2022-08-11T17:52:18+08:00","tree_id":"4524c1738dd56ea214b1d4373a9911e90700eeff","url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution/commit/2c2d13565ac833b802e30658ae7f4e800a2e3bc0"}],"compare":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution/compare/c2fda8bea4f1...2c2d13565ac8","created":false,"deleted":false,"forced":true,"head_commit":{"author":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"committer":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"distinct":true,"id":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","message":"Update workflow config file","timestamp":"2022-08-11T17:52:18+08:00","tree_id":"4524c1738dd56ea214b1d4373a9911e90700eeff","url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution/commit/2c2d13565ac833b802e30658ae7f4e800a2e3bc0"},"pusher":{"email":"lu.siqi@outlook.com","name":"SiqiLu"},"ref":"refs/heads/master","repository":{"allow_forking":true,"archive_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/{archive_format}{/ref}","archived":false,"assignees_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/assignees{/user}","blobs_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/blobs{/sha}","branches_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/branches{/branch}","clone_url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution.git","collaborators_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/collaborators{/collaborator}","comments_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/comments{/number}","commits_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/commits{/sha}","compare_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/compare/{base}...{head}","contents_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/contents/{+path}","contributors_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/contributors","created_at":1660156415,"default_branch":"master","deployments_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/deployments","description":"Test project for GitHub action \"dotnet-bump-version\".","disabled":false,"downloads_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/downloads","events_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/events","fork":false,"forks":0,"forks_count":0,"forks_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/forks","full_name":"SiqiLu/DotnetBumpVersionTestSolution","git_commits_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/commits{/sha}","git_refs_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/refs{/sha}","git_tags_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/tags{/sha}","git_url":"git://github.com/SiqiLu/DotnetBumpVersionTestSolution.git","has_downloads":true,"has_issues":true,"has_pages":false,"has_projects":true,"has_wiki":true,"homepage":null,"hooks_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/hooks","html_url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution","id":523456051,"is_template":false,"issue_comment_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/issues/comments{/number}","issue_events_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/issues/events{/number}","issues_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/issues{/number}","keys_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/keys{/key_id}","labels_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/labels{/name}","language":"C#","languages_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/languages","license":null,"master_branch":"master","merges_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/merges","milestones_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/milestones{/number}","mirror_url":null,"name":"DotnetBumpVersionTestSolution","node_id":"R_kgDOHzNOMw","notifications_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/notifications{?since,all,participating}","open_issues":0,"open_issues_count":0,"owner":{"avatar_url":"https://avatars.githubusercontent.com/u/3321644?v=4","email":"lu.siqi@outlook.com","events_url":"https://api.github.com/users/SiqiLu/events{/privacy}","followers_url":"https://api.github.com/users/SiqiLu/followers","following_url":"https://api.github.com/users/SiqiLu/following{/other_user}","gists_url":"https://api.github.com/users/SiqiLu/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/SiqiLu","id":3321644,"login":"SiqiLu","name":"SiqiLu","node_id":"MDQ6VXNlcjMzMjE2NDQ=","organizations_url":"https://api.github.com/users/SiqiLu/orgs","received_events_url":"https://api.github.com/users/SiqiLu/received_events","repos_url":"https://api.github.com/users/SiqiLu/repos","site_admin":false,"starred_url":"https://api.github.com/users/SiqiLu/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/SiqiLu/subscriptions","type":"User","url":"https://api.github.com/users/SiqiLu"},"private":false,"pulls_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/pulls{/number}","pushed_at":1660211556,"releases_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/releases{/id}","size":7,"ssh_url":"git@github.com:SiqiLu/DotnetBumpVersionTestSolution.git","stargazers":0,"stargazers_count":0,"stargazers_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/stargazers","statuses_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/statuses/{sha}","subscribers_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/subscribers","subscription_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/subscription","svn_url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution","tags_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/tags","teams_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/teams","topics":[],"trees_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/trees{/sha}","updated_at":"2022-08-10T18:51:43Z","url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution","visibility":"public","watchers":0,"watchers_count":0,"web_commit_signoff_required":false},"sender":{"avatar_url":"https://avatars.githubusercontent.com/u/3321644?v=4","events_url":"https://api.github.com/users/SiqiLu/events{/privacy}","followers_url":"https://api.github.com/users/SiqiLu/followers","following_url":"https://api.github.com/users/SiqiLu/following{/other_user}","gists_url":"https://api.github.com/users/SiqiLu/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/SiqiLu","id":3321644,"login":"SiqiLu","node_id":"MDQ6VXNlcjMzMjE2NDQ=","organizations_url":"https://api.github.com/users/SiqiLu/orgs","received_events_url":"https://api.github.com/users/SiqiLu/received_events","repos_url":"https://api.github.com/users/SiqiLu/repos","site_admin":false,"starred_url":"https://api.github.com/users/SiqiLu/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/SiqiLu/subscriptions","type":"User","url":"https://api.github.com/users/SiqiLu"}},"eventName":"push","sha":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","ref":"refs/heads/master","workflow":"test workflow for dotnet-bump-version","action":"__SiqiLu_dotnet-bump-version","actor":"SiqiLu","job":"build","runNumber":12,"runId":2838923159,"apiUrl":"https://api.github.com","serverUrl":"https://github.com","graphqlUrl":"https://api.github.com/graphql"}
*/
/*
githubEvent Sample:
{"after":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","base_ref":null,"before":"c2fda8bea4f16380125475e972adbfc0b0eead18","commits":[{"author":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"committer":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"distinct":true,"id":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","message":"Update workflow config file","timestamp":"2022-08-11T17:52:18+08:00","tree_id":"4524c1738dd56ea214b1d4373a9911e90700eeff","url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution/commit/2c2d13565ac833b802e30658ae7f4e800a2e3bc0"}],"compare":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution/compare/c2fda8bea4f1...2c2d13565ac8","created":false,"deleted":false,"forced":true,"head_commit":{"author":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"committer":{"email":"lu.siqi@outlook.com","name":"Siqi Lu","username":"SiqiLu"},"distinct":true,"id":"2c2d13565ac833b802e30658ae7f4e800a2e3bc0","message":"Update workflow config file","timestamp":"2022-08-11T17:52:18+08:00","tree_id":"4524c1738dd56ea214b1d4373a9911e90700eeff","url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution/commit/2c2d13565ac833b802e30658ae7f4e800a2e3bc0"},"pusher":{"email":"lu.siqi@outlook.com","name":"SiqiLu"},"ref":"refs/heads/master","repository":{"allow_forking":true,"archive_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/{archive_format}{/ref}","archived":false,"assignees_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/assignees{/user}","blobs_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/blobs{/sha}","branches_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/branches{/branch}","clone_url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution.git","collaborators_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/collaborators{/collaborator}","comments_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/comments{/number}","commits_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/commits{/sha}","compare_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/compare/{base}...{head}","contents_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/contents/{+path}","contributors_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/contributors","created_at":1660156415,"default_branch":"master","deployments_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/deployments","description":"Test project for GitHub action \"dotnet-bump-version\".","disabled":false,"downloads_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/downloads","events_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/events","fork":false,"forks":0,"forks_count":0,"forks_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/forks","full_name":"SiqiLu/DotnetBumpVersionTestSolution","git_commits_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/commits{/sha}","git_refs_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/refs{/sha}","git_tags_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/tags{/sha}","git_url":"git://github.com/SiqiLu/DotnetBumpVersionTestSolution.git","has_downloads":true,"has_issues":true,"has_pages":false,"has_projects":true,"has_wiki":true,"homepage":null,"hooks_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/hooks","html_url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution","id":523456051,"is_template":false,"issue_comment_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/issues/comments{/number}","issue_events_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/issues/events{/number}","issues_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/issues{/number}","keys_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/keys{/key_id}","labels_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/labels{/name}","language":"C#","languages_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/languages","license":null,"master_branch":"master","merges_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/merges","milestones_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/milestones{/number}","mirror_url":null,"name":"DotnetBumpVersionTestSolution","node_id":"R_kgDOHzNOMw","notifications_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/notifications{?since,all,participating}","open_issues":0,"open_issues_count":0,"owner":{"avatar_url":"https://avatars.githubusercontent.com/u/3321644?v=4","email":"lu.siqi@outlook.com","events_url":"https://api.github.com/users/SiqiLu/events{/privacy}","followers_url":"https://api.github.com/users/SiqiLu/followers","following_url":"https://api.github.com/users/SiqiLu/following{/other_user}","gists_url":"https://api.github.com/users/SiqiLu/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/SiqiLu","id":3321644,"login":"SiqiLu","name":"SiqiLu","node_id":"MDQ6VXNlcjMzMjE2NDQ=","organizations_url":"https://api.github.com/users/SiqiLu/orgs","received_events_url":"https://api.github.com/users/SiqiLu/received_events","repos_url":"https://api.github.com/users/SiqiLu/repos","site_admin":false,"starred_url":"https://api.github.com/users/SiqiLu/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/SiqiLu/subscriptions","type":"User","url":"https://api.github.com/users/SiqiLu"},"private":false,"pulls_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/pulls{/number}","pushed_at":1660211556,"releases_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/releases{/id}","size":7,"ssh_url":"git@github.com:SiqiLu/DotnetBumpVersionTestSolution.git","stargazers":0,"stargazers_count":0,"stargazers_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/stargazers","statuses_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/statuses/{sha}","subscribers_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/subscribers","subscription_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/subscription","svn_url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution","tags_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/tags","teams_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/teams","topics":[],"trees_url":"https://api.github.com/repos/SiqiLu/DotnetBumpVersionTestSolution/git/trees{/sha}","updated_at":"2022-08-10T18:51:43Z","url":"https://github.com/SiqiLu/DotnetBumpVersionTestSolution","visibility":"public","watchers":0,"watchers_count":0,"web_commit_signoff_required":false},"sender":{"avatar_url":"https://avatars.githubusercontent.com/u/3321644?v=4","events_url":"https://api.github.com/users/SiqiLu/events{/privacy}","followers_url":"https://api.github.com/users/SiqiLu/followers","following_url":"https://api.github.com/users/SiqiLu/following{/other_user}","gists_url":"https://api.github.com/users/SiqiLu/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/SiqiLu","id":3321644,"login":"SiqiLu","node_id":"MDQ6VXNlcjMzMjE2NDQ=","organizations_url":"https://api.github.com/users/SiqiLu/orgs","received_events_url":"https://api.github.com/users/SiqiLu/received_events","repos_url":"https://api.github.com/users/SiqiLu/repos","site_admin":false,"starred_url":"https://api.github.com/users/SiqiLu/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/SiqiLu/subscriptions","type":"User","url":"https://api.github.com/users/SiqiLu"}}
*/
