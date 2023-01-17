import { ThemeService } from './../../../services/theme/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-toggle-switch',
	templateUrl: './toggle-switch.component.html',
})
export class ToggleSwitchComponent implements OnInit {
	public isDarkTheme?: boolean;

	public constructor(private themeService: ThemeService) { }

	ngOnInit(): void {
		this.themeService
			.pref$.subscribe(res => this.isDarkTheme = res === 'dark');
	}

	public toggleTheme = () => {
		this.isDarkTheme = !this.isDarkTheme;
		this.themeService.updateThemePref(this.isDarkTheme ? 'dark' : 'light');
	}

}
