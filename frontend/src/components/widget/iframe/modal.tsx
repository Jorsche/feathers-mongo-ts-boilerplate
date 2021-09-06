import React, {useState} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import IframeWidget from './iframeWidget';

const IFrameModal=({iframeOpen, setIframeOpen})=> {
//  const [open, setOpen] = useState(false)
    console.log("iframeOpen",iframeOpen);
    const [confirm, setConfirm]=useState(false);
  const [url, setUrl]= useState("");
    console.log("url",url);
  return (
      <div style={
          {
          minHeight: "100%",
              minWidth: "100%",
              display: "flex",
          }}>
    <Modal
     size={"small"}
      onClose={() => setIframeOpen(false)}
      onOpen={() => setIframeOpen(true)}
      open={iframeOpen}
       trigger={<Button>Iframe Modal</Button>}
    >
      <Modal.Header>Enter URL:</Modal.Header>
    <input type="text"
    placeholder="url"
           style={{width:"100%"}}
    onChange={(e)=>setUrl(e.target.value)}
     />
      <Modal.Actions>
        <Button color='black' onClick={() =>
             {setIframeOpen(false)
             setUrl("")
             }}>
          Cancel
        </Button>
        <Button
          content="Confirm"
          icon='checkmark'
          onClick={() =>  {
              setIframeOpen(false)
              setConfirm(true)
            }}
          positive
        />
      </Modal.Actions>
    </Modal>
    {
    confirm && (<IframeWidget src={url}></IframeWidget>)
    }
    </div>
  )
}

export default IFrameModal
