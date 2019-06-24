import {
    SELECT_PROGRAM_ARCHIVE
} from "../app/config/constants/action_types";

export function selectProgramArchiveItem(archiveItem: any) {
    return {type: SELECT_PROGRAM_ARCHIVE, payload: archiveItem};
}
