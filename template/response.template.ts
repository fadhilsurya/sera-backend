
interface ResponseData {
    Code: number;
    Data: any;
    Message: string;
    Error?: any;
}

interface PaginationData extends ResponseData {
    Page: number;
    PerPage: number;
    Total: number;
}

function Response(code: number, data: any, message: string, error?: any): ResponseData {
    return {
        Code: code,
        Data: data,
        Message: message,
        Error: error,
    };
}

function ResponsePagination(code: number, data: any, message: string, page: number, perpage: number, total: number, error?: any): PaginationData {
    return {
        Code: code,
        Data: data,
        Message: message,
        Page: page,
        PerPage: perpage,
        Total: total,
        Error: error,
    };
}

export { Response, ResponsePagination };
