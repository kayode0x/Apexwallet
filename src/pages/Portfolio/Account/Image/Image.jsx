import './Image.scss';
import { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { RotateSpinner } from 'react-spinners-kit';

const Image = ({ imageModal, setImageModal }) => {
	const [displayPic, setDisplayPic] = useState({
		file: null,
		image: null,
	});
	const [uploading, setUploading] = useState(false);
	const [file, setFile] = useState(null);
	const apiEndpoint = 'https://api.apexwallet.app/api/v1/user/image';

	const handleImageSwitch = async (e) => {
		e.preventDefault();

		let reader = new FileReader();
		const newFile = e.target.files[0];
		await setFile(newFile);

		if (newFile.size > 3145728) {
			toast.error(`Image size is too large, max size allowed is 3MB`, {});
		} else
			reader.onloadend = () => {
				setDisplayPic({
					file: newFile,
					image: reader.result,
				});
			};

		reader.readAsDataURL(newFile);
	};

	const handleImageChange = async (e) => {
		e.preventDefault();

		try {
			setUploading(true);
			const formData = new FormData();
			formData.append('image', file);
			await axios
				.put(apiEndpoint, formData)
				.then((res) => {
					if (res.status === 200) {
						toast.success(`${res.data}`, {});
                        setDisplayPic({
							file: null,
							image: null,
						});
						setImageModal(!imageModal);
						setUploading(false);
					}
				})
				.catch(async (err) => {
					toast.error(`${err.response.data}`, {});
					setUploading(false);
				});
		} catch (error) {
			console.log('Error: ' + error);
			setUploading(false);
		}
	};

	return (
		<div className={`imageModal ${imageModal ? 'Show' : ''}`}>
			<form onSubmit={handleImageChange} className="imageContainer">
				{displayPic.image ? null : (
					<div className="input">
						<input
							name="file-input"
							id="file-input"
							type="file"
							onChange={(e) => handleImageSwitch(e)}
							accept="image/*"
						/>
						<label htmlFor="file-input">
							<div className="icon">
								<BiUpload />
							</div>
							<span>Select Image</span>
						</label>
						<p>Max File Size: 3MB</p>
					</div>
				)}
				{displayPic.image && (
					<div className="newImageDiv">
						<img src={displayPic.image} alt="display pic" />
						<div
							className="icon"
							onClick={() =>
								setDisplayPic({
									file: null,
									image: null,
								})
							}
						>
							<RiCloseCircleLine />
						</div>
					</div>
				)}
				{displayPic.image && (
					<button className="submitBtn" disabled={uploading ? true : false} type="submit">
						{uploading ? <RotateSpinner size={30} color="#fff" /> : 'Submit'}
					</button>
				)}
			</form>
		</div>
	);
};

export default Image;
