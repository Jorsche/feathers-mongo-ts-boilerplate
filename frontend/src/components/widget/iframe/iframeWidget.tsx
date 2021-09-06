import "./iframeWidget.css"

const IframeWidget = ({src})=>{
    //const src = "https://www.rapidtables.com/tools/notepad.html";
    //var url = data.url + "&output=embed";
    return (
        <div className="iframe-div">

                <iframe className={"iframe"} src={src}></iframe>

            </div>
       )
}

export default IframeWidget;
