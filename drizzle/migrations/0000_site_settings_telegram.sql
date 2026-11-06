CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read whatsapp settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (key IN ('whatsapp_number','whatsapp_message'));

CREATE TABLE public.telegram_admins (
  chat_id bigint PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.telegram_admins TO service_role;
ALTER TABLE public.telegram_admins ENABLE ROW LEVEL SECURITY;