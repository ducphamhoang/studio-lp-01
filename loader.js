export default function googleUserContentLoader({ src, width, quality }) {
  // Parse the URL to manipulate the path
  const url = new URL(src);
  const pathParts = url.pathname.split('/');

  // Find and replace the size segment (e.g., 's1920') with the requested width
  // This assumes the size segment starts with 's' followed by digits
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i].startsWith('s') && !isNaN(parseInt(pathParts[i].substring(1)))) {
      pathParts[i] = `s${width}`;
      break; // Found and replaced, exit loop
    }
  }

  // Reconstruct the pathname
  url.pathname = pathParts.join('/');

  // Google User Content typically handles quality internally or ignores 'q'
  // We will not append quality query parameter here

  return url.toString();
}
