const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, " Vui Long dien thong tin ten nguoi dung "]
		},
		email: {
			type: String,
			required: [true, " Vui Long dien thong tin email nguoi dung "],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				" Vui lòng nhập email hợp lệ "
			]
		},
		password: {
			type: String,
			required: [true, " Vui Long dien thong tin password nguoi dung"],
			minLength: [6, " mật khẩu phải có tối đa 6 ký tự "],
		},
		photo: {
			type: String,
			required: [true, " Vui Long dien thong tin photo nguoi dung"],
			default: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
		},
		phone: {
			type: String,
			default: "+234"
		},
		bio: {
			type: String,
			maxLength: [250, "tiểu sử, lý lịch khong vuot qua 250 ky ty"],
			default: "bio"
		}
	},
	{
		timestamps: true
	}
)

const User = mongoose.model('User', userSchema);
module.exports = User;