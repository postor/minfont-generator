import { Component } from 'react'

import DragZone from 'react-dropzone'
import request from 'superagent'

import { translate } from '../components/layout/i18n'
import Layout from '../components/layout'

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uploading: false,
      uploaded: false,
      filePath: '',
      words: '',
      fontFamily: '',
    }
  }

  render() {
    const { uploading, uploaded, words, fontFamily } = this.props

    return (<article>
      {!uploading && !uploaded && (<DragZone onDrop={(files) => this.handleDrop(files)} >
        <p>Drop your WOFF2\WOFF\EOT\TTF here, or click to select.</p>
      </DragZone>)}

      {uploading && (<p>uploading...</p>)}

      {uploaded && (<div>
        <input
          placeholder="font name"
          value={fontFamily}
          onChange={(e) => {
            this.setState({ fontFamily: e.target.value })
          }}
        />
        <textarea
          placeholder="words to use"
          rows="5"
          style={{
            width: '100%',
          }}
          value={words}
          onChange={(e) => {
            this.setState({ words: e.target.value })
          }}
        />
        <button onClick={() => this.handleText()}>next</button>
      </div>)}

    </article>)
  }

  handleDrop(files) {
    const req = request.post('/api/upload');
    files.forEach(file => {
      req.attach('file', file);
    });
    req.end((err, res = {}) => {
      const { filePath } = JSON.parse(res.text)
      this.setState({
        filePath,
        uploaded: true,
        uploading: false,
      })
    });
  }

  handleText() {
    const { words, filePath, fontFamily } = this.state
    request.post('/api/words').send({
      words,
      filePath,
      fontFamily,
    }).end((err, res) => {
      const { url } = JSON.parse(res.text)
      console.log(url)
    });
  }
}

export default Layout(translate(['index'])(Index))