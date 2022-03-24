import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      exisitingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials.' });
    }

    const token = jwt.sign(
      {
        email: exisitingUser.email,
        id: exisitingUser._id,
      },
      process.env.SECRET_KEY_JWT,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: exisitingUser, token });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong.',
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({ message: 'User already exist.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.SECRET_KEY_JWT,
      { expiresIn: '1h' }
    );

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong.',
    });
  }
};
