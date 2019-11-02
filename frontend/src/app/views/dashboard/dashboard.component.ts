import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ServerInfo } from '../../classes/ServerInfo';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  tasks:Array<any>;

  constructor(private http: HttpClient) {    
    
  }

  ngOnInit() {
    this.http.get(ServerInfo.Url + "/api/dashboard-tasks")
      .subscribe(data => {
        this.tasks = <Array<any>>data;
      })
  }
  
}
