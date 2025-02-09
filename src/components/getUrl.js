export default function getUrl(fileName){
    // return(
    //      require("../images/"+fileName)
    // );

    return fileName ? `/images/${fileName}` : "";
}