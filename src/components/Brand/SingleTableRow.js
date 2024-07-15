import React from 'react';
import Link from '@components/ui/link';
import { paramToString, stringToParam } from '@utils/helperFunction';
import { useRouter } from 'next/router'

function SingleTableRow({ item }) {
  const {
    name,
    unit_price,
    strength,
    generic,
    pharmaceutical,
    dosage_type,
    mfg,
    id,
    package_info,
    package_info2,
    package_info3,
    package_info4,
    package_info5
  } = item || {};
  const { name: genericName } = generic || {};
  const { name: pharmaceuticalName } = pharmaceutical || {};
  const { icon, name: dosagesName } = dosage_type || {};

    const router  = useRouter();

    return (

          <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-teal-400 even:text-white hover:bg-cyan-200 hover:text-black"
              onClick={()=> router.push(`/brand/${id}/${stringToParam(name)}`)}
          >
              <td className="py-2 px-6">
                  {name}
              </td>
              <td className="py-2 px-8">
                  <div className="flex flex-row gap-2">
                      <img
                          src={
                              icon
                                  ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                                  : 'https://dummyimage.com/21x21/ffffff/000000.png'
                          }
                          alt={dosagesName}
                      />
                      <p>{dosagesName}</p>
                  </div>

              </td>
              <td className="py-2 px-6">{strength}</td>
              <td className="py-2 px-6">
                  <p className="mb-0">{pharmaceuticalName}</p>
                  {mfg && (
                        <p className="mb-0">MFG By: {mfg}</p>
                  )}
              </td>
              <td className="py-2 px-6">
                  {package_info}
                  {package_info2 && (
                      <p className="mb-0">{package_info2}</p>
                  )}
                  {package_info3 && (
                      <p className="mb-0">{package_info3}</p>
                  )}
                  {package_info4 && (
                      <p className="mb-0">{package_info4}</p>
                  )}
                  {package_info5 && (
                      <p className="mb-0">{package_info5}</p>
                  )}

              </td>
          </tr>

  );
}

export default SingleTableRow;
