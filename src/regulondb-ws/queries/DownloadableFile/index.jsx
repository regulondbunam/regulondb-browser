import { useQuery } from "@apollo/client";
import { query_ListAllDownloadableFiles } from "./queries";
import { DataVerifier } from "../../../components/ui-components";

export function useGetListAllDownloadableFiles() {
    const {data, loading, error} = useQuery(query_ListAllDownloadableFiles)
    let fileList
    let fileGroup
    if(data && !error){
        if(DataVerifier.isValidArray(data.listAllDownloadableFiles)){
            fileList = data.listAllDownloadableFiles
            fileGroup = formatGroupFiles(fileList)
        }else{
            console.error("no download files");
        }
    }
    if (error) {
        console.error("Web services query error: listAllDownloadableFiles: ", error);
        console.log("query: ",query_ListAllDownloadableFiles);
    }
    return {fileList,fileGroup,loading,error}
}

function formatGroupFiles(fileList = []){
    let fileGroup = {
        other: []
    }
    fileList.forEach((file)=>{
        if (DataVerifier.isValidString(file.group)) {
            if(fileGroup.hasOwnProperty(file.group)){
                fileGroup[file.group] = [...fileGroup[file.group], file]
            }else{
                fileGroup[file.group] = [file]
            }
        }else{
            fileGroup.other.push(file)
        }
    })
    console.log(fileGroup);
    return fileGroup
}