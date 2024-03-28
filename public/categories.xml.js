// import {DBPost} from '@lib/types';
// import {format} from 'date-fns';
// import Categories from "../store/CategoriesSlice"
// import { useState } from 'react';
// function getSitemap() {
//   const [Loading  , setLoading] = useState(true)
//   const { Categories } = useSelector((state) => state.CategoriesSlice);
 
//   useEffect(() => {
//    }, [dispatch]);

//    useEffect(()=>{
//      if(Categories){
//       setLoading(false)
//      }
//    }, [Categories])
//   return `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${ 
//       Categories?.cats?.map(
//         (page) => `<url>
//           <loc>${page.name}</loc>
//           <lastmod>${format(
//             new Date(page.date_modified),
//             'yyyy-MM-dd',
//           )}</lastmod>
//         </url>`,
//       )
//       .join('')}
//     </urlset>
//   `;
// }
