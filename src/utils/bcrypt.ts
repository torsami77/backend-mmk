import bcrypt from 'bcryptjs';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password:string) => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashedPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword:string, password:string) => bcrypt.compareSync(password, hashedPassword);


export {
  hashPassword,
  comparePassword,
};