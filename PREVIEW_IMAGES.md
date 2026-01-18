# Preview Images Generation

To generate preview images for the Agent Kammer site:

1. **Start the server:**
   ```bash
   PORT=8000 npm run dev
   ```

2. **Run the preview script:**
   ```bash
   node preview-script.mjs
   ```

The preview images will be saved to the `previews/` directory:
- `preview-1-homepage.png` - Homepage preview
- `preview-2-real-estate.png` - Real Estate page preview

**Note:** The site should match the production site at https://agentkammer.com/
