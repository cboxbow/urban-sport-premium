import { getHomepageViewData } from '@/lib/site-content';

export default async function PlayersPage() {
  const { rankings } = await getHomepageViewData();

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Leaderboard</div>
        <h1 className="mt-4 font-display text-6xl uppercase tracking-[0.1em] sm:text-8xl">Rankings</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">
          Public rankings in this edition are curated locally, keeping the presentation premium while remaining easy to maintain from the admin panel.
        </p>
      </section>

      <section className="page-container pb-20">
        <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03]">
          <table className="data-table">
            <thead>
              <tr><th>Player</th><th>Club</th><th>Matches</th><th>Wins</th><th>Losses</th><th>Points</th></tr>
            </thead>
            <tbody>
              {rankings.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.club}</td>
                  <td>{player.matches}</td>
                  <td>{player.wins}</td>
                  <td>{player.losses}</td>
                  <td>{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
