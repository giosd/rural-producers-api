import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('farms-count')
  @ApiOperation({ summary: 'Total de fazendas cadastradas' })
  @ApiResponse({ status: 200, description: 'Quantidade de fazendas' })
  getTotalFarms() {
    return this.dashboardService.getTotalFarms();
  }

  @Get('total-area')
  @ApiOperation({ summary: 'Soma da área total de todas as fazendas' })
  @ApiResponse({ status: 200, description: 'Área total (hectares)' })
  getTotalArea() {
    return this.dashboardService.getTotalArea();
  }

  @Get('by-state')
  @ApiOperation({ summary: 'Distribuição de fazendas por estado' })
  @ApiResponse({ status: 200, description: 'Gráfico de pizza por estado' })
  getFarmsByState() {
    return this.dashboardService.getFarmsByState();
  }

  @Get('by-culture')
  @ApiOperation({ summary: 'Distribuição de culturas plantadas' })
  @ApiResponse({ status: 200, description: 'Gráfico de pizza por cultura' })
  getFarmsByCulture() {
    return this.dashboardService.getFarmsByCulture();
  }

  @Get('land-usage')
  @ApiOperation({ summary: 'Distribuição de uso do solo' })
  @ApiResponse({ status: 200, description: 'Gráfico de uso do solo' })
  getLandUsage() {
    return this.dashboardService.getLandUsage();
  }
}
