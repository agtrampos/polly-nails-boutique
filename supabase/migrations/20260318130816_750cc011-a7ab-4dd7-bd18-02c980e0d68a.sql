-- Create gallery table
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  before_url TEXT NOT NULL,
  after_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are publicly viewable"
  ON public.gallery_items FOR SELECT USING (true);

CREATE POLICY "Anyone can insert gallery items"
  ON public.gallery_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can delete gallery items"
  ON public.gallery_items FOR DELETE USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

CREATE POLICY "Gallery images are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can upload gallery images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Anyone can delete gallery images"
  ON storage.objects FOR DELETE USING (bucket_id = 'gallery');