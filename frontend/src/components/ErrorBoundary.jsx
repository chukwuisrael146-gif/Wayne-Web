import { Component } from 'react';
import { profile } from '../data/profile';

export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-12">
        <h1 className="text-4xl font-light">Something went wrong.</h1>
        <p className="leading-7 text-neutral-400">Please reload the page, or get in touch directly to discuss your project.</p>
        <button type="button" onClick={() => window.location.reload()} className="min-h-12 self-start rounded-full bg-accent px-6 text-black">Reload portfolio</button>
        <a href={`mailto:${profile.email}`} className="break-all text-accent underline">{profile.email}</a>
      </main>
    );
  }
}
