import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	public isDarkTheme?: boolean;
	private sub: Subscription = new Subscription();

	public constructor(private themeService: ThemeService) { }

	ngOnInit(): void {
		this.sub.add(
			this.themeService.pref$.subscribe(val => {
				this.isDarkTheme = val === 'dark';
			})
		)
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
