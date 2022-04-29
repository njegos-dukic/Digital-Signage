package org.unibl.etf.ds.advice;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;
import org.unibl.etf.ds.exception.HttpException;

import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpException.class)
    public final ResponseEntity<Object> handleHttpException(HttpException e, HandlerMethod handlerMethod) {
        Log log = getLog(handlerMethod);
        log.error(e);
        if (e.getStatus() == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(e.getData(), e.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException e, HandlerMethod handlerMethod) {
        Log log = getLog(handlerMethod);
        log.error(e);

        List<ObjectError> allErrors = e.getBindingResult().getAllErrors();
        StringBuilder errorMessage = new StringBuilder();
        for(ObjectError error : allErrors)
            errorMessage.append(error.getDefaultMessage()).append("\n");

        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleException(Exception e, HandlerMethod handlerMethod) {
        Log log = getLog(handlerMethod);
        log.error(e);

        return new ResponseEntity<>("Error happened while processing the request.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Log getLog(HandlerMethod handlerMethod) {
        return LogFactory.getLog(handlerMethod.getMethod().getDeclaringClass());
    }
}

