const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * @desc    Login user
 * @route   POST /auth
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {});

/**
 * @desc    Refresh
 * @route   GET /auth/refresh
 * @access  Public - porque el token ha expirado
 */
const refresh = asyncHandler(async (req, res) => {});

/**
 * @desc    Logout user
 * @route   POST /auth/logout
 * @access  Public - limpia la cookie si existe
 */
const logout = asyncHandler(async (req, res) => {});

module.exports = {
  login,
  refresh,
  logout,
};
