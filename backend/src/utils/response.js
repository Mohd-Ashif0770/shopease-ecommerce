
export const successResponse = (res, statusCode=200, message="success", data=null) => {

    const response = {
        success: true,
        message
    }

    if(data!==null){
        response.data= data;
    }

    return res.status(statusCode).json(response)
}

export const errorResponse = (res, statusCode=500, message="Error", error=null) => {

    const response = {
        success: false,
        message
    }

    if(error!==null){
        response.error= error;
    }

    return res.status(statusCode).json(response)
}