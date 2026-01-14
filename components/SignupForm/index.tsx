'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getTranslations, type Language } from '@/lib/i18n';
import { createSignupSchema, type SignupFormData } from '@/lib/validations';

interface SignupFormProps {
  lang: Language;
}

export function SignupForm({ lang }: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const posthog = usePostHog();

  const t = getTranslations(lang);

  const signupSchema = createSignupSchema(lang);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      website: '', // Honey pot field
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          website: data.website, // Honey pot
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setSubmitError(
            lang === 'pt-BR'
              ? 'Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.'
              : result.error || 'Too many requests. Please wait a few minutes before trying again.'
          );
        } else {
          setSubmitError(
            lang === 'pt-BR'
              ? result.error || 'Erro ao cadastrar. Tente novamente.'
              : result.error || 'Error signing up. Please try again.'
          );
        }
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      reset();

      // Track signup event in PostHog
      posthog?.capture('newsletter_signup', {
        email: data.email,
        name: data.name,
        language: lang,
        timestamp: new Date().toISOString(),
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error signing up:', error);
      setSubmitError(
        lang === 'pt-BR'
          ? 'Erro ao cadastrar. Tente novamente.'
          : 'Error signing up. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="p-8 rounded-xl border-2 border-green-500/50 bg-green-50 dark:bg-green-900/20 shadow-lg">
          <p className="text-green-700 dark:text-green-300 font-medium text-center text-lg">
            {lang === 'pt-BR'
              ? '✅ Cadastro realizado com sucesso! Em breve você receberá atualizações.'
              : '✅ Successfully signed up! You will receive updates soon.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-card border-2 border-border rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative hidden md:block bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500/30 mb-4">
                  <svg
                    className="w-12 h-12 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {lang === 'pt-BR' ? 'Fique por dentro!' : 'Stay Updated!'}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'pt-BR'
                    ? 'Receba as últimas novidades sobre o desenvolvimento do Redzone Boss'
                    : 'Get the latest news about Redzone Boss development'}
                </p>
                <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>
                    {lang === 'pt-BR'
                      ? 'Sem spam, apenas conteúdo relevante'
                      : 'No spam, just relevant content'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t.signUpText}</h3>
              <p className="text-muted-foreground text-sm">
                {lang === 'pt-BR'
                  ? 'Cadastre-se para receber atualizações exclusivas'
                  : 'Sign up to receive exclusive updates'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Honey pot field - hidden from users but visible to bots */}
              <div
                className="absolute left-[-9999px] opacity-0 pointer-events-none"
                aria-hidden="true"
              >
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {lang === 'pt-BR' ? 'Nome' : 'Name'}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={lang === 'pt-BR' ? 'Seu nome' : 'Your name'}
                  disabled={isSubmitting}
                  className="h-11"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {lang === 'pt-BR' ? 'Email' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={lang === 'pt-BR' ? 'seu@email.com' : 'your@email.com'}
                  disabled={isSubmitting}
                  className="h-11"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              {submitError && (
                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">
                    {submitError}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (lang === 'pt-BR' ? 'Cadastrando...' : 'Signing up...') : t.signUp}
              </Button>

              <p className="text-xs text-center text-muted-foreground pt-2">
                {lang === 'pt-BR'
                  ? 'Ao se cadastrar, você concorda em receber emails sobre o projeto.'
                  : 'By signing up, you agree to receive emails about the project.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
