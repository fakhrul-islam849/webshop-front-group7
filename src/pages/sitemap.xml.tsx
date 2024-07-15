import {GetServerSideProps} from 'next';
import {formatInTimeZone} from "date-fns-tz";
import { useGetAllBrandListQuery } from 'src/features/brand/brandApi';
import {stringToParam} from "@utils/helperFunction";
export default function SitemapXml() {
    // return null;
}

export const getServerSideProps: GetServerSideProps<{}> = async  (ctx) => {
    const brandApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/brand/public/all-brands`);
    const brands = await brandApi.json();
    const genericApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/generic/get-all`);
    const generics = await genericApi.json();
    const pharmaceuticalApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/pharmaceutical`);
    const pharmaceuticals = await pharmaceuticalApi.json();
    const blogCategoryApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/blog-category`);
    const blogCategories = await blogCategoryApi.json();
    const blogApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/dosage/get-all`);
    const blogs = await blogApi.json();
    const dosageApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/dosage`);
    const dosages = await dosageApi.json();
    const diagnosticCompanyApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/diagnostic-company`);
    const diagnosticCompanies = await diagnosticCompanyApi.json();
    const diagnosticTestApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/diagnostic-test-group`);
    const diagnosticTests = await diagnosticTestApi.json();
    const jobApi = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/job/get-all-jobs`);
    const jobs = await jobApi.json();

    const xml = generateSitemap(
        brands.data, generics.data,
        pharmaceuticals.data,
        blogCategories.data,
        blogs.data,
        dosages.data,
        diagnosticCompanies.data,
        diagnosticTests.data,
        jobs.data,
    );
    ctx.res.setHeader('Content-Type', 'text/xml');
    ctx.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59',
    );
    ctx.res.write(xml);
    ctx.res.end();

    return {
        props: {}
    }
}

export function generateSitemap(
    brands = [],
    generics = [],
    pharmaceuticals = [],
    blogCategories = [],
    blogs = [],
    dosages = [],
    diagnosticCompanies = [],
    diagnosticTests = [],
    jobs = [],
) {
    // const { data: tst, isLoading, isSuccess, isError } = useGetAllBrandListQuery();

    return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              <url>
                <loc>https://www.drugx.com.bd</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                  <loc>https://www.drugx.com.bd/contact-us</loc>
                  <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                   <loc>https://www.drugx.com.bd/about-us</loc>
                   <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/page/2/privacy-policy</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/page/5/advertisement</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/page/4/terms-condition</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/page/3/disclaimer</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/brand/allopathic</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/generic/allopathic</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/brand/herbal</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/generic/herbal</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
                <url>
                    <loc>https://www.drugx.com.bd/brand/dermatology</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/brand/food-supplyment</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/brand/veterinary</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/dosage-forms</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/companies</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/drug-classes</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/blog</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/doctors</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/diagnostic/company</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/diagnostic/group</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              <url>
                <loc>https://www.drugx.com.bd/jobs</loc>
                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
              </url>
              ${brands.length > 0 && brands?.map((brand: any) => {
                    return `<url>
                                <loc>https://www.drugx.com.bd/brand/${brand.id}/${stringToParam(brand.name.replace('&', '&amp;'))}</loc>
                                <lastmod>${formatInTimeZone(brand.updatedAt, 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                            </url>`
              })}
              ${generics.length > 0 && generics?.map((generic: any) => {
                    return `<url>
                            <loc>https://www.drugx.com.bd/generic/${generic.value}/${stringToParam(generic.label.replace(/[^a-zA-Z0-9 ]/g, ''))}</loc>
                            <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                        </url>`
              })}
              ${blogs.length > 0 && blogs?.map((blog: any) => {
                    return `<url>
                                <loc>https://www.drugx.com.bd/blog/${blog.id}/${stringToParam(blog.name)}</loc>
                                <lastmod>${formatInTimeZone(blog.updatedAt, 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                            </url>`
              })}
              ${dosages.length > 0 && dosages?.map((dosage: any) => {
                    return `<url>
                                <loc>https://www.drugx.com.bd/dosage-forms/${dosage.id}/${stringToParam(dosage.name)}</loc>
                                <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                            </url>`
              })}
              ${blogCategories.length > 0 && blogCategories?.map((blogCategory: any) => {
                return `<url>
                            <loc>https://www.drugx.com.bd/blog-category/${blogCategory.id}/${stringToParam(blogCategory.name)}</loc>
                            <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                        </url>`
              })}
              ${diagnosticTests.length > 0 && diagnosticTests?.map((diagnosticTest: any) => {
                return `<url>
                            <loc>https://www.drugx.com.bd/diagnostic/group/${diagnosticTest.id}/${stringToParam(diagnosticTest.name.replace(/[^a-zA-Z0-9 ]/g, ''))}</loc>
                            <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                        </url>`
              })}
              ${diagnosticCompanies.length > 0 && diagnosticCompanies?.map((diagnosticCompany: any) => {
                return `<url>
                            <loc>https://www.drugx.com.bd/diagnostic/company/${diagnosticCompany.id}/${stringToParam(diagnosticCompany.name.replace(/[^a-zA-Z0-9 ]/g, ''))}</loc>
                            <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                        </url>`
              })}
              ${pharmaceuticals.length > 0 && pharmaceuticals?.map((pharmaceutical: any) => {
                return `<url>
                            <loc>https://www.drugx.com.bd/companies/${pharmaceutical.id}/${stringToParam(pharmaceutical.name.replace(/[^a-zA-Z0-9 ]/g, ''))}/brand</loc>
                            <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                        </url>`
              })}
              ${jobs.length > 0 && jobs?.map((job: any) => {
                return `<url>
                            <loc>https://www.drugx.com.bd/jobs/${job.id}/${stringToParam(job.name.replace(/&/g,'&amp;'))}</loc>
                            <lastmod>${formatInTimeZone(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd')}</lastmod>
                        </url>`
              })}
            </urlset>`
}