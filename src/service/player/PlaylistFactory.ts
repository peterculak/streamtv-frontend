import Playlist from "./Playlist";
import PlaylistItem from "./PlaylistItem";

class PlaylistFactory {
    public static createPlaylistForProgramSeason(selectedSeason: any): Playlist {
        const playlist = new Playlist([]);
        let sort = 'asc';
        selectedSeason.episodes.forEach((item: any) => {
            const playlistItem = this.createPlaylistItem(item);
            if (item['type'] === 'article' || item['type'] === 'NewsArticle') {
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
        let dateAdded;
        if (item.dateAdded !== undefined) {
            try {
                dateAdded = new Date(item.dateAdded);
            } catch (error) {
            }

            if (!this.isValidDate(dateAdded)) {
                const bits = item.dateAdded.split('.');
                const correctlyFormattedDateString = `${bits[2]}-${bits[1]}-${bits[0]}`;
                try {
                    dateAdded = new Date(correctlyFormattedDateString);
                } catch (error){}
            }
            if (!this.isValidDate(dateAdded)) {
                dateAdded = item.dateAdded;
            }
        }

        return new PlaylistItem(
            item.name,
            item.thumbnailUrl ? item.thumbnailUrl : item.image,
            item.mp4,
            item.timeRequired ? parseInt(item.timeRequired.replace(/PT|S/g, '')) : 0,
            '',
            {episodeNumber: item.episodeNumber, dateAdded: dateAdded, type: item['type']}
        )
    }

    private static isValidDate(d: any) {
        return !isNaN(d) && d instanceof Date;
    }
}

export default PlaylistFactory;
