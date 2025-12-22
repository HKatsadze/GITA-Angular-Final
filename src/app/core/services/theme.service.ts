import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE } from '../tokens/storage.token';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'student_ecommerce_theme';

  private readonly modeSubject = new BehaviorSubject<ThemeMode>(this.loadTheme());
  readonly mode$ = this.modeSubject.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: Storage) {

    this.applyTheme(this.modeSubject.value);
  }

  toggle(): void {
    const next: ThemeMode = this.modeSubject.value === 'light' ? 'dark' : 'light';
    this.modeSubject.next(next);
    this.storage.setItem(this.storageKey, next);
    this.applyTheme(next);
  }

  private applyTheme(mode: ThemeMode): void {
    document.body.classList.toggle('dark-theme', mode === 'dark');
  }

  private loadTheme(): ThemeMode {
    const saved = this.storage.getItem(this.storageKey);
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  }
}
