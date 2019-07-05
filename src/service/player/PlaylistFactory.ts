import Playlist from "./Playlist";
import PlaylistItem from "./PlaylistItem";

class PlaylistFactory {
    public static createPlaylistForProgramSeason(selectedSeason: any): Playlist {
        const playlist = new Playlist([]);
        let sort = 'asc';
        selectedSeason.episodes.forEach((item: any) => {
            const playlistItem = this.createPlaylistItem(item);
            if (item['@type'] === 'article') {
                sort = 'desc';
                playlistItem.sortPosition = Date.parse(item.dateAdded);
            } else {
                playlistItem.sortPosition = item.episodeNumber;//tvseries
            }
            playlist.add(playlistItem);
        });
        if (sort === 'asc') {
            playlist.sortAsc();
        } else if (sort === 'desc') {
            playlist.sortDesc();
        }

        return playlist;
    }

    private static createPlaylistItem(item: any): PlaylistItem {
        return new PlaylistItem(
            item.name,
            item.thumbnailUrl ? item.thumbnailUrl : item.image,
            item.mp4,
            item.timeRequired ? parseInt(item.timeRequired.replace(/PT|S/g, '')) : 0,
            '',
            {episodeNumber: item.episodeNumber, dateAdded: item.dateAdded}
        )
    }
}

export default PlaylistFactory;
