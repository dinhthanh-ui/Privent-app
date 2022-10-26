const User = require("../Models/userModel")
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) =>
{
	const { email, password, name } = req.body;

	try
	{
		if (!email || !password || !name)
		{
			res.status(400).json({
				errorCode: 1,
				errorMessage: " Vui Long Nhap Thong Tin Email, Password va Name ",
				errorData: []
			});
		} else if (password.length < 6)
		{
			res.status(400).json({
				errorCode: 1,
				errorMessage: " Mat Khau phai co Toi Thieu Phai 6 Ky Tu ",
				errorData: []
			})
		}
		else
		{
			const userExists = await User.findOne({ email })

			if (userExists)
			{
				res.status(400).json({
					errorCode: 1,
					errorMessage: " Email da duoc dang ky, Vui long doi mot email moi ",
					errorData: []
				})
			} else
			{
				// encrypt password before saving to Database => mã hóa mật khẩu trước khi lưu vào Database
				const salt = bcrypt.genSaltSync(10);
				const hashedPassword = bcrypt.hashSync(password, salt)

				// Create new user
				const user = await User.create({
					name: name,
					email: email,
					password: hashedPassword
				})
				if (user)
				{
					const { _id, name, email, phone, photo, bio } = user
					res.status(201).json({
						errorCode: 0,
						errorMessage: " Tao moi nguoi dung thanh cong ",
						errorData: [{
							_id: _id,
							name: name,
							email: email,
							phone: phone,
							photo: photo,
							bio: bio
						}]
					})
				} else
				{
					res.status(400).json({
						errorCode: 1,
						errorMessage: " Du lieu nguoi dung khong hop le ",
						errorData: []
					})
				}
			}
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			errorCode: -1,
			errorMessage: "error from server !!!!",
			errorData: []
		})
	}
}

const user = () => { }


module.exports = {
	registerUser: registerUser,
}