import { Controller, Get, Req, Res } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('set')
  setSessionData(@Req() req, @Res() res) {
    this.sessionService.set(req, 'exampleKey', 'exampleValue');
    return res.send('Session data set.');
  }

  @Get('get')
  getSessionData(@Req() req, @Res() res) {
    const data = this.sessionService.get(req, 'exampleKey');
    return res.send(`Session data: ${data}`);
  }
}
