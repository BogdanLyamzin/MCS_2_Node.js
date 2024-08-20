import { ValidationError } from "sequelize";
import HttpError from "../helpers/HttpError.js";

const ctrlWrapper = ctrl => {
    const func = async(req, res, next)=> {
        try {
            await ctrl(req, res, next);
        }
        catch(error){
            if(error?.parent?.code === "23505") {
                return next(HttpError(409, error.message))
            }
            if(error instanceof ValidationError) {
                return next(HttpError(400, error.message))
            }
            next(error);
        }
    }

    return func;
}

export default ctrlWrapper;