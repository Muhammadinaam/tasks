import { Component, OnInit, OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ServerInfo } from '../../classes/ServerInfo';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  tasks:Array<any>;
  refreshIntervalTimeSeconds: number = 20;
  refreshInterval: any;
  isRefreshIntervalStopped: boolean = false;

  constructor(private http: HttpClient) {    
    
  }

  ngOnInit() {
    this.refreshTasks();

    this.refreshInterval = setInterval(()=>{
      this.refresh();
    }, this.refreshIntervalTimeSeconds * 1000);
  }

  refresh() {
    if(this.isRefreshIntervalStopped) {
      return;
    }
    this.refreshTasks();
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
  }

  refreshTasks() {
    this.http.get(ServerInfo.Url + "/api/dashboard-tasks")
      .subscribe(data => {
        this.tasks = <Array<any>>data;
      })
  }

  taskModalOpenedClosed(eventType) {
    this.isRefreshIntervalStopped = eventType == 'opened';
  }
  
}
