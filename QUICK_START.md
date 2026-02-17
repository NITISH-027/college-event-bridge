# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier is fine)

### Step 2: Clone & Install
```bash
git clone https://github.com/NITISH-027/college-event-bridge.git
cd college-event-bridge
npm install
```

### Step 3: Set Up Supabase

1. **Create a project** at [supabase.com](https://supabase.com)

2. **Run the SQL migration**:
   - Open Supabase SQL Editor
   - Copy and paste `supabase/migrations/001_initial_schema.sql`
   - Click "Run"

3. **Get your credentials**:
   - Go to Project Settings → API
   - Copy the Project URL and anon key

4. **Create `.env.local`**:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### Step 5: Try It Out

1. **Sign Up**: Create an account with email/password
2. **Create Event**: Click the + button, fill the form
3. **View Events**: See your event in the dashboard
4. **Add Comment**: Click an event, post a comment
5. **Edit Profile**: Go to profile tab, update your info

## 📱 Mobile Testing

Open Chrome DevTools → Toggle device toolbar → iPhone 14 Pro Max (430px)

## 🎨 Key Features to Test

- ✅ Authentication (email/password)
- ✅ Create event with image
- ✅ Real-time comments
- ✅ Edit/delete own content
- ✅ Profile management
- ✅ PWA install prompt

## 🐛 Troubleshooting

**Build fails?**
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Database errors?**
- Verify SQL migration ran successfully
- Check Supabase dashboard → Table Editor
- Ensure RLS policies are enabled

**Auth not working?**
- Verify environment variables are set
- Check Supabase Auth settings
- For Google OAuth: configure redirect URLs

**Images not uploading?**
- Verify `event-images` bucket exists in Storage
- Check bucket is set to public
- Verify storage policies are enabled

## 📚 Next Steps

- Read `README.md` for full documentation
- Review `IMPLEMENTATION.md` for technical details
- Check `supabase/migrations/` for database schema
- Explore `app/actions/` for API logic

## 🚢 Deploy to Production

**Vercel** (Recommended):
```bash
vercel
```

**Environment Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

**Post-Deployment**:
1. Update OAuth redirect URLs in Supabase
2. Add PWA icons (192x192 and 512x512)
3. Test on real mobile device

## 💡 Tips

- Use Chrome DevTools → Application → Manifest to test PWA
- Check Network tab to see Supabase realtime connections
- Use Supabase dashboard to view database and storage
- Test on actual mobile device for best experience

## 🆘 Need Help?

- Check the [README.md](./README.md)
- Review [IMPLEMENTATION.md](./IMPLEMENTATION.md)
- Open an issue on GitHub
- Check Supabase logs for errors

---

**Happy coding! 🎉**
