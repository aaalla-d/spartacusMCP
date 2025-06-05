# Git Setup Guide for Spartacus MCP Server

## Current Status ✅
- ✅ Git repository initialized
- ✅ Files committed locally
- ✅ Remote repository configured
- ❌ Authentication needed for push

## Repository Information
- **Local Repository**: `/Users/aaalla/Documents/Learn/MCP`
- **Remote Repository**: `https://github.com/aaalla-d/spartacusMCP.git`
- **Current Branch**: `main`
- **Commit Hash**: `fb583f6`

## Authentication Options

### Option 1: Personal Access Token (Recommended) 🔑

1. **Create a Personal Access Token**:
   - Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (full control of private repositories)
   - Copy the generated token

2. **Configure Git to use the token**:
   ```bash
   # Set the remote URL with your username
   git remote set-url origin https://aaalla-d@github.com/aaalla-d/spartacusMCP.git
   
   # Push (you'll be prompted for password - use your token)
   git push -u origin main
   ```

3. **When prompted for password, use your Personal Access Token**

### Option 2: SSH Key Authentication 🔐

1. **Check if you have SSH keys**:
   ```bash
   ls -la ~/.ssh
   ```

2. **If no SSH key exists, generate one**:
   ```bash
   ssh-keygen -t ed25519 -C "aaalla.d@gmail.com"
   ```

3. **Add SSH key to GitHub**:
   ```bash
   # Copy your public key
   cat ~/.ssh/id_ed25519.pub
   ```
   - Go to [GitHub Settings → SSH and GPG keys](https://github.com/settings/keys)
   - Click "New SSH key"
   - Paste your public key

4. **Test SSH connection**:
   ```bash
   ssh -T git@github.com
   ```

5. **Push using SSH**:
   ```bash
   git remote set-url origin git@github.com:aaalla-d/spartacusMCP.git
   git push -u origin main
   ```

### Option 3: GitHub CLI (Easiest) 🚀

1. **Install GitHub CLI**:
   ```bash
   brew install gh
   ```

2. **Authenticate**:
   ```bash
   gh auth login
   ```

3. **Push**:
   ```bash
   git push -u origin main
   ```

## Quick Commands to Complete Setup

Once you've set up authentication, run these commands:

```bash
# Navigate to project directory
cd /Users/aaalla/Documents/Learn/MCP

# Verify repository status
git status
git log --oneline

# Push to remote (choose your authentication method above)
git push -u origin main

# Verify push was successful
git remote show origin
```

## Troubleshooting

### If you get "Permission denied" errors:
- Make sure you're using the correct GitHub username
- Verify your authentication method (token/SSH key)
- Check that the repository exists and you have write access

### If you get "Repository not found" errors:
- Verify the repository URL: `https://github.com/aaalla-d/spartacusMCP.git`
- Make sure the repository exists on GitHub
- Check that you have the correct permissions

### If you get "Authentication failed" errors:
- For HTTPS: Use Personal Access Token as password
- For SSH: Make sure your SSH key is added to GitHub

## Files Ready for Push 📁

The following files are staged and committed locally:

- `.gitignore` - Git ignore rules
- `README.md` - Comprehensive documentation
- `example-usage.js` - Working examples
- `package.json` - Dependencies and scripts
- `setup.sh` - Setup script
- `spartacus-mcp-server.ts` - Main MCP server
- `tsconfig.json` - TypeScript configuration

## Next Steps After Successful Push

1. **Verify on GitHub**: Visit https://github.com/aaalla-d/spartacusMCP.git
2. **Update README**: Add any additional information
3. **Create releases**: Tag versions for distribution
4. **Set up CI/CD**: Add GitHub Actions for automated testing

## Need Help?

If you encounter issues:
1. Check GitHub's [authentication documentation](https://docs.github.com/en/authentication)
2. Verify repository permissions
3. Try the GitHub CLI method (often the easiest)

---

**Note**: The repository is currently empty on GitHub, so this will be the initial push that populates it with all the Spartacus MCP Server files. 