import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface FilterMenuProps {
  showClaimed: boolean;
  setShowClaimed: (value: boolean) => void;
  setshowAll: (value: boolean) => void;
  showAll: boolean;
}

export const FilterMenu = ({ showClaimed, setShowClaimed, showAll, setshowAll }: FilterMenuProps) => {


  return (
    <Menu as="div" className="relative inline-block text-left origin-top-right ">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {showAll? 'Show All' : showClaimed ? 'Show Claimed Only' : 'Show Unclaimed'}


        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item>
              {({ active }) => (
                <button
                  className={`border-none  ${showClaimed === null ? 'bg-gray-100 text-gray-900' : ' bg-gray-100 text-gray-700'}
              block w-full text-left px-4 py-2 text-sm`}
                  onClick={()=> setshowAll(true)}
                >
                  Show All
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`border-none  ${showClaimed === false ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-700'}
              block w-full text-left px-4 py-2 text-sm`}
                  onClick={() => {
                    setshowAll(false);
                    setShowClaimed(false)
                  
                  }}
                >
                  Show Unclaimed
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`border-none  ${showClaimed === true ? 'bg-gray-100 text-gray-900' : ' bg-gray-100 text-gray-700'}
              block w-full text-left px-4 py-2 text-sm`}
              onClick={() => {
                setshowAll(false);
                setShowClaimed(true)

                
              
              }}
                >
                  Show Claimed Only
                </button>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
