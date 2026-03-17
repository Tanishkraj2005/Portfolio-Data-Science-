const GITHUB_USERNAME = 'tanishkraj2005';

const statsTemplate = `
<div class="stats-dashboard">
    <div class="stats-header">
        <h3><i class='bx bx-code-alt'></i> Coding Stats & Activity</h3>
        <p>Live metrics dynamically synced from GitHub</p>
    </div>

    <div class="stats-grid" style="display: flex; justify-content: center;">
        <!-- GitHub Card -->
        <div class="stat-card github-card" style="width: 100%; max-width: 600px;">
            <div class="stat-card-header">
                <div class="stat-brand">
                    <i class='bx bxl-github'></i>
                    <span>GitHub Activity</span>
                </div>
                <a href="https://github.com/` + GITHUB_USERNAME + `/" target="_blank" class="stat-link" id="gh-link">@` + GITHUB_USERNAME + `</a>
            </div>

            <!-- Custom GitHub Live Stats instead of Repos/Followers -->
            <div class="stat-metrics github-metrics" style="margin-bottom: 2rem;">
                <div class="metric" style="background: rgba(0, 238, 255, 0.05); border-color: rgba(0,238,255,0.2);">
                    <span class="m-value highlight" id="gh-contribs">--</span>
                    <span class="m-label">Total Contributions</span>
                </div>
                <div class="metric">
                    <span class="m-value" id="gh-repos">--</span>
                    <span class="m-label">Repositories</span>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;" class="metric-center">
                <!-- Live GitHub Streak Widget -->
                <img src="https://github-readme-streak-stats.herokuapp.com/?user=` + GITHUB_USERNAME + `&theme=transparent&hide_border=true&stroke=00eeff&ring=00eeff&fire=00eeff&currStreakLabel=a0abc0" alt="GitHub Streak" width="100%" style="border-radius:1rem; min-height:165px; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle);" onerror="this.style.display='none';" />
            </div>
        </div>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('coding-stats');
    if (container) {
        container.innerHTML = statsTemplate;
        fetchLiveCodolioGitHubStats();
        setInterval(() => {
            fetchLiveCodolioGitHubStats();
        }, 600000);
    }
});


async function fetchLiveCodolioGitHubStats() {
    try {
        const contribRes = await fetch("https://github-contributions-api.deno.dev/" + GITHUB_USERNAME + ".json");
        if (contribRes.ok) {
            const contribData = await contribRes.json();
            document.getElementById('gh-contribs').textContent = contribData.totalContributions || 0;
        }

        // Fetch Repositories from standard GitHub API
        const repoRes = await fetch("https://api.github.com/users/" + GITHUB_USERNAME);
        if (repoRes.ok) {
            const repoData = await repoRes.json();
            document.getElementById('gh-repos').textContent = repoData.public_repos || 0;
        }
    } catch (e) {
        console.error("Error fetching GitHub data:", e);
    }
}
