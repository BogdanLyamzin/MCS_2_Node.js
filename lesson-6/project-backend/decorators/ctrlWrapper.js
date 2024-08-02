import { ValidationError } from "sequelize";
import HttpError from "../helpers/HttpError.js";

const ctrlWrapper = ctrl => {
    const func = async(req, res, next)=> {
        try {
            await ctrl(req, res, next);
        }
        catch(error){
            if(error instanceof ValidationError) {
                // error.status = 400;
                return next(HttpError(400, error.message))
            }
            next(error);
        }
    }

    return func;
}

export default ctrlWrapper;