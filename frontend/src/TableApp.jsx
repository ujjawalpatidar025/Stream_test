import React from 'react'

const TableApp = () => {
    return (
        <div class="container mx-auto">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handle</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                      <td class="px-6 py-4 border whitespace-nowrap">1</td>
                      <td class="px-6 py-4 border whitespace-nowrap">Mark</td>
                      <td class="px-6 py-4 border whitespace-nowrap" rowspan="2">@mdo</td>
                    </tr>
                    <tr>
                    <td class="px-6 py-4 border whitespace-nowrap">2</td>
                      <td class="px-6 py-4 border whitespace-nowrap">Jacob</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 border whitespace-nowrap">2</td>
                      <td class="px-6 py-4 border whitespace-nowrap">Larry</td>
                      <td class="px-6 py-4 border whitespace-nowrap">@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      
    )
}

export default TableApp