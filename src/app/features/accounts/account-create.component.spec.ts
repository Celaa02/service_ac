import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AccountCreateComponent } from './account-create.component';
import { AccountsService } from '../../core/services/accounts.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

class MockAccountsService {
  create = jasmine.createSpy('create').and.returnValue(of({ id: 'acc-1' }));
}
class MockAuthService {
  private token?: string;
  setMockToken(t: string) { this.token = t; }
  getToken() { return this.token ?? ''; }
}
class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

describe('AccountCreateComponent', () => {
  let fixture: ComponentFixture<AccountCreateComponent>;
  let component: AccountCreateComponent;
  let accounts: MockAccountsService;
  let auth: MockAuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCreateComponent],
      providers: [
        { provide: AccountsService, useClass: MockAccountsService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.componentInstance;

    accounts = TestBed.inject(AccountsService) as unknown as MockAccountsService;
    auth = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;

    fixture.detectChanges();
  });

  it('renderiza el título y el botón inicia deshabilitado', async () => {
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('h1')?.textContent)
      .toContain('Crear cuenta bancaria');

    await fixture.whenStable();
    fixture.detectChanges();

    const btn = el.querySelector('button') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.disabled).toBeTrue();
  });


  it('envía payload correcto usando ownerId del navigation state y navega a /accounts', () => {
    history.replaceState({ ownerId: 'user-123', email: 'john@example.com' }, '');

    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.accountNumber = 'ACC99999';
    component.balance = 100000;
    component.createAccount();

    expect(accounts.create).toHaveBeenCalledWith({
      holderName: 'john@example.com',
      accountNumber: 'ACC99999',
      ownerId: 'user-123',
      balance: 100000,
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/accounts');
  });

  it('muestra error cuando el backend falla', () => {
    (accounts.create as jasmine.Spy).and.returnValue(
      throwError(() => ({ error: { message: 'Cuenta duplicada' } }))
    );

    component['ownerId'] = 'user-x';
    component.accountNumber = 'ACC00001';
    component.balance = 50;
    component.createAccount();

    expect(component.error).toBe('Cuenta duplicada');
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('fallback: si no hay state, toma ownerId/email del token', () => {
    history.replaceState(null, '');

    const payload = btoa(JSON.stringify({ sub: 'user-token-1', email: 'token@example.com' }));
    const token = `aaa.${payload}.bbb`;
    auth.setMockToken(token);

    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.accountNumber = 'ACC777';
    component.balance = 10;
    component.createAccount();

    expect(accounts.create).toHaveBeenCalledWith({
      holderName: 'token@example.com',
      accountNumber: 'ACC777',
      ownerId: 'user-token-1',
      balance: 10,
    });
  });
});
