import { Injectable } from "@nestjs/common";
import * as CryptoJS from "crypto-js";
import * as bcrypt from "bcrypt";

require("dotenv").config();
@Injectable()
export class EncryptionService {
  constructor() {}

  public hashPassword = async (password: string) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  };

  public comparePasswords = async (
    password: string | Buffer,
    hashedPassword: string,
  ) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  public async encrypt(data: string) {
    if (!data) {
      return {
        message: "can't find data to be encrypted",
      };
    }

    const encrypt = await CryptoJS.AES.encrypt(
      data,
      process.env.AES_CRYPTION_KEY,
    ).toString();

    if (!encrypt) {
      return { message: "unable to encrypt data" };
    } else {
      return encrypt;
    }
  }

  public decrypt(data: any) {
    if (!data) {
      return {
        message: "can't find data to be decrypted",
      };
    }

    const decrypt = CryptoJS.AES.decrypt(
      data,
      process.env.AES_CRYPTION_KEY,
    ).toString(CryptoJS.enc.Utf8);

    if (!decrypt) {
      return { message: "unable to decrypt data" };
    } else {
      return decrypt;
    }
  }
}
