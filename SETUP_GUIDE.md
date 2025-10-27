# Setup Guide - Timeline Component

This guide will help you set up and run the Timeline/Gantt View component locally.

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Git**: For cloning the repository

## Step 1: Clone the Repository

```bash
git clone [your-repository-url]
cd timeline-component
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 18
- TypeScript 5
- Tailwind CSS 3
- Storybook 7
- date-fns
- clsx
- And all dev dependencies

## Step 3: Run Storybook

```bash
npm run storybook
```

This will:
- Start the Storybook development server
- Open http://localhost:6006 in your browser
- Hot reload on file changes

## Step 4: Explore the Stories

Navigate through the Storybook sidebar to see all available stories:

1. **Default**: Basic timeline with sample data
2. **Empty**: Empty state demonstration
3. **With Dependencies**: Dependency lines visualization
4. **Interactive Playground**: Full interactive demo
5. **View Modes**: Switch between day/week/month views
6. **Mobile View**: Responsive behavior
7. **Large Dataset**: Performance testing
8. **Accessibility**: Keyboard navigation demo

## Step 5: Development Workflow

### Making Changes

1. Edit component files in `src/components/Timeline/`
2. Edit styles in `src/styles/`
3. Edit utility functions in `src/utils/`
4. Storybook will auto-reload with your changes

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Step 6: Building for Production

### Build Storybook

```bash
npm run build-storybook
```

This creates a static Storybook build in `storybook-static/` directory.

### Deploy Storybook

You can deploy the build to various platforms:

#### Chromatic (Recommended)

1. Create an account at https://www.chromatic.com
2. Run: `npx chromatic --project-token=<your-token>`

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

#### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --dir=storybook-static`

#### GitHub Pages

```bash
npm run build-storybook
git subtree push --prefix storybook-static origin gh-pages
```

## Project Structure

```
timeline-component/
├── .storybook/          # Storybook configuration
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   ├── constants/       # Constants
│   ├── styles/          # CSS styles
│   └── sample-data.ts   # Sample data
├── package.json
├── tsconfig.json        # TypeScript config
└── tailwind.config.js   # Tailwind config
```

## Troubleshooting

### Issue: Storybook won't start

**Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build errors

**Solution**: Check TypeScript errors
```bash
npm run build
```

### Issue: Tailwind classes not working

**Solution**: Ensure Tailwind config includes all source files
Check `tailwind.config.js` content paths

### Issue: Hot reload not working

**Solution**: Restart Storybook
```bash
# Stop Storybook (Ctrl+C)
npm run storybook
```

## Next Steps

1. ✅ Review the component architecture
2. ✅ Explore all Storybook stories
3. ✅ Test keyboard navigation
4. ✅ Try different view modes
5. ✅ Build and deploy your Storybook
6. ✅ Customize the component for your needs

## Additional Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Support

If you encounter any issues:
1. Check the README.md for common problems
2. Review the Storybook console for errors
3. Check browser console for runtime errors
4. Ensure all dependencies are installed correctly

Happy coding! 🚀
