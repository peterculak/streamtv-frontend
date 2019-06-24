import Playlist from "./Playlist";
import PlaylistItem from "./PlaylistItem";

class PlaylistFactory {
    public static createPlaylistForProgramSeason(selectedSeason: any): Playlist {
        const playlist = new Playlist([]);
        selectedSeason.episodes.forEach((item: any) => {
            const playlistItem = this.createPlaylistItem(item);
            playlistItem.sortPosition = item.episodeNumber;
            playlist.add(playlistItem);
        });
        playlist.sortAsc();

        return playlist;
    }

    private static createPlaylistItem(item: any): PlaylistItem {
        return new PlaylistItem(
            item.name,
            item.thumbnailUrl,
            item.mp4,
            parseInt(item.timeRequired.replace(/PT|S/g, '')),
            `Episode: ${item.episodeNumber}`,
            {episodeNumber: item.episodeNumber}
        )
    }
}

export default PlaylistFactory;
