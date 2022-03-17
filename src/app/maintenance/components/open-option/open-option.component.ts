import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-open-option',
  templateUrl: './open-option.component.html',
  styleUrls: ['./open-option.component.scss']
})
export class MaintenanceOpenOptionComponent implements OnInit {
  optionId: number;
  optionDescription: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    const optionId = this.route.snapshot.paramMap.get('optionId');
    const optionDescription =
      this.route.snapshot.paramMap.get('optionDescription');

    if (optionId == null || optionDescription == null) {
      this.notifierService.notify(
        'error',
        'Não foi possível localizar algum dos parâmetros!'
      );
      return;
    }

    this.optionId = Number(optionId);
    this.optionDescription = optionDescription;
  }

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  goToOptions(): void {
    this.router.navigateByUrl(`maintenance/options/${this.optionId}`);
  }
}
