import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express' {
    interface Request {
        user?: any;
    }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token não fornecido.');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });

            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException('Token inválido.');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        const authorization = request.headers['authorization'];

        if (authorization && authorization.startsWith('Bearer ')) {
            return authorization.split(' ')[1];
        }

        return null;
    }
}
