import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ModalService<T> {
	public title?: string;
	private componentRef?: ComponentRef<T>

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef, private injector: Injector
	) { }

	public async close(): Promise<void> {
		if (!this.componentRef) return;

		this.appRef.detachView(this.componentRef.hostView);
		this.componentRef.destroy();
		this.componentRef = undefined;
	}

	public async open(param: { component: Type<T>, modalTitle?: string }): Promise<void> {
		if (this.componentRef) return

		this.title = param.modalTitle;
		this.resolveComponent(param.component);
		this.appendComponentToHtmlBody();
	}

	private resolveComponent(component: Type<T>): void {
		this.componentRef = this.componentFactoryResolver
			.resolveComponentFactory<T>(component)
			.create(this.injector);

		this.appRef.attachView(this.componentRef.hostView);
	}

	private appendComponentToHtmlBody(): void {
		const domElement = (this.componentRef?.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		document.body.appendChild(domElement);
	}

}
