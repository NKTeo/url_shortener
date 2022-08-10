import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { getShortURL } from './services/URLService'

function App() {

	const [originalURL, setOriginalURL] = useState("");
	const [shortURL, setShortURL] = useState("");

	async function generateShortURL(){
		const short_url = await getShortURL(originalURL);
		setShortURL(short_url);
	}

	return (
		<div className="container vh-100">
			<div className="row h-75 justify-content-center align-items-center">
				<div>
					<h1 className="text-center">URL Shortener</h1>

					<div className="input-group">
						<input id="generate-url" type="text" className="form-control" placeholder="Input original URL" aria-label="Input URL" value={originalURL} onChange={e => {setOriginalURL(e.target.value)}}/>

						<div className="input-group-append">
							<button id="generate-url" type="button" className="btn btn-success" onClick={generateShortURL}>
								Generate shortened URL
							</button>
						</div>
					</div>

					<div style={{marginTop: "30px", padding: "25px", border: "10px solid green"}}>
						<h4 className="mb-4">
							Long URL: <span style={{fontWeight: "normal"}}>{originalURL}</span>
						</h4>
						<h4>
							Shortened URL: <a href={shortURL} target="_blank">{shortURL}</a>
						</h4>
					</div>

					<div style={{marginTop: "10px", textAlign: "right"}}>
						Made by Nian Kai @ 2022
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;