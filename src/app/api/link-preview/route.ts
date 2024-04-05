import * as ch from 'cheerio';

export async function POST(request: Request) {
  const { url } = await request.json(); // Get the URL from request query parameter

  // Error handling for missing URL
  if (!url) {
    return new Response(`Missing URL parameter`, {
      status: 400,
    });
  }

  try {
    const response = await fetch(url); // Fetch the website content

    // Check for successful response
    if (!response.ok) {
      return new Response(`Error fetching URL`, {
        status: response.status,
      });
    }

    const html = await response.text(); // Get the HTML content

    // Extract data from meta tags (title, description, image)
    let title = '';
    let description = '';
    let image = '';

    // Use a library like cheerio to parse HTML and extract meta tags
    const cheerio = ch.load(html);

    // Example using cheerio:
    title = cheerio('title').text().trim();
    description = cheerio('meta[name="description"]').attr('content') || '';
    image = cheerio('meta[property="og:image"]').attr('content') || '';

    console.log('title', title);

    // // Optionally use puppeteer for advanced scraping (consider server resources)
    // if (!image && puppeteer) {
    //   // Implement puppeteer logic to take a screenshot or extract a specific image
    //   // This can be resource-intensive, consider caching strategies
    //   image = await getScreenshotWithPuppeteer(url); // Replace with puppeteer implementation
    // }

    const previewData = { title, description, image };
    return Response.json({ previewData }, { status: 200 });
  } catch (error: any) {
    return new Response(`Error fetching preview data`, {
      status: 500,
    });
  }
}

// Implement getScreenshotWithPuppeteer function if using puppeteer
