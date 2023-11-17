import ButtonPrimary from '@/components/button/ButtonPrimary';
import LayoutRmib from '@/components/rmib/LayoutRmib';
import React, { useState, useEffect } from 'react';
import ButtonAbuBgt from '@/components/button/ButtonAbuBgt';
import SetCategory from '@/components/button/ButtonCategory';
import Loader from '@/components/Loader';
import { Alert } from 'antd';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
  const categories = [
    { man: 'Seniman', woman: 'Seniwati', name: 'aesthetic' },
    { man: 'Penulis Skenario', woman: 'Kritikus Buku', name: 'literary' },
    { man: 'Komponis', woman: 'Pramuniaga Took Musik', name: 'music' },
    { man: 'Guru SD', woman: 'Guru SD', name: 'socialService' },
    { man: 'Petugas Arsip', woman: 'Penulis Steno', name: 'clarical' },
    { man: 'Ahli Bangunan', woman: 'Penjahit', name: 'practical' },
    { man: 'Ahli Rontgen', woman: 'Ahli Bedah', name: 'medical' },
    { man: 'Juru Ukur', woman: 'Tukang Kebun', name: 'outdoor' },
    { man: 'Montir', woman: 'Ahli Reparasi Jam', name: 'mecanical' },
    { man: 'Petugas Pajak', woman: 'Juru Bayar', name: 'computational' },
    {
      man: 'Insinyur Kimia Industri',
      woman: 'Insinyut Kimia Industri',
      name: 'science',
    },
    {
      man: 'Personal Contact',
      woman: 'Penyiar Radio',
      name: 'personalContact',
    },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('accumulatedValues'));

    console.log('hasil', data);

    let total = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (!isNaN(value)) {
          total += value;
        }
      }
    }

    console.log('Total', total);
  });

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFieldCategory, setSelectedFieldCategory] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [selectDisabled, setSelectDisabled] = useState({});

  const handleSelectChange = (event, categoryName) => {
    const selectedNumber = parseInt(event.target.value);

    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [categoryName]: selectedNumber,
    }));

    if (fieldValues[categoryName] === undefined) {
      setSelectedFields([
        ...selectedFields,
        { number: selectedNumber, title: categoryName },
      ]);
      handleFieldCategoryChange(selectedNumber);

      setFieldValues((prevValues) => ({
        ...prevValues,
        [categoryName]: selectedNumber,
      }));

      // Set status disabled untuk kategori ini menjadi true
      setSelectDisabled((prevSelectDisabled) => ({
        ...prevSelectDisabled,
        [categoryName]: true,
      }));
    } else {
      // Jika nilai sudah ada, batalkan pemilihan
      const updatedNumbers = { ...selectedNumbers };
      updatedNumbers[categoryName] = '';
      setSelectedNumbers(updatedNumbers);

      const updatedFields = selectedFields.filter(
        (field) => field.title !== categoryName,
      );
      setSelectedFields(updatedFields);

      setSelectedFieldCategory((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[selectedNumber];
        return updatedMap;
      });

      setFieldValues((prevValues) => {
        const updatedValues = { ...prevValues };
        delete updatedValues[categoryName];
        return updatedValues;
      });

      setSelectDisabled((prevSelectDisabled) => ({
        ...prevSelectDisabled,
        [categoryName]: false,
      }));
    }
  };

  const handleFieldCategoryChange = (fieldNumber) => {
    if (!selectedCategory) {
      return;
    }

    const selectedCategoryObj = categories.find(
      (cat) => cat.name === selectedCategory,
    );

    if (!selectedCategoryObj) {
      return;
    }

    setSelectDisabled((prevSelectDisabled) => ({
      ...prevSelectDisabled,
      [categoryName]: false,
    }));

    const categoryName = selectedCategoryObj.name;
    setSelectedFieldCategory((prevMap) => ({
      ...prevMap,
      [fieldNumber]: categoryName,
    }));

    const fieldValue = fieldNumber;

    setFieldValues((prevValues) => ({
      ...prevValues,
      [categoryName]: fieldValue,
    }));
  };

  const handleCancel = (categoryName) => {
    setSelectedNumbers((prevSelectedNumbers) => {
      const { [categoryName]: removedValue, ...rest } = prevSelectedNumbers;
      return rest;
    });

    const updatedFields = selectedFields.filter(
      (field) => field.title !== categoryName,
    );

    setSelectedFields(updatedFields);

    setSelectedFieldCategory((prevMap) => {
      const updatedMap = { ...prevMap };
      for (const field of updatedFields) {
        delete updatedMap[field.number];
      }
      return updatedMap;
    });

    setFieldValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[categoryName];
      return updatedValues;
    });

    // Set status disabled untuk kategori ini menjadi false (bisa diklik)
    setSelectDisabled((prevSelectDisabled) => ({
      ...prevSelectDisabled,
      [categoryName]: false,
    }));
  };

  const handlePrev = () => {
    router.push('/tes-rmib/section-a');
  };

  const handleNextClick = () => {
    const storedValue = localStorage.getItem('accumulatedValues');
    if (Object.keys(fieldValues).length === 12) {
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);

        const accumulatedValues = { ...fieldValues };

        for (const category in parsedValue) {
          if (parsedValue.hasOwnProperty(category)) {
            if (!accumulatedValues[category]) {
              accumulatedValues[category] = parsedValue[category];
            } else {
              accumulatedValues[category] += parsedValue[category];
            }
          }
        }

        localStorage.setItem(
          'accumulatedValues',
          JSON.stringify(accumulatedValues),
        );
        console.log('Accumulated values:', accumulatedValues);
      }
      setIsLoading(true);
      localStorage.setItem('value', JSON.stringify(fieldValues));
      setTimeout(() => {
        setIsLoading(false);
        router.push('/tes-rmib/section-g');
      }, 1000);
    } else {
      setAlertVisible(true);
      setMessage('Pilih semua jenis pekerjaan');
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  };

  return (
    <LayoutRmib>
      {isLoading ? <Loader /> : null}
      <section className="md:px-16 lg:px-40">
        <p className="mt-5 mb-5 font-medium text-center text-black">
          Urutkan Pekerjaan
        </p>

        <span className="flex justify-center">
          {alertVisible ? (
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 backdrop-blur-md">
              <Alert
                type="error"
                message={message}
                showIcon
                className="w-1/2 mb-5 text-center"
              />
            </div>
          ) : null}
        </span>

        <fieldset className="flex justify-center">
          <div className="flex flex-col items-center w-full space-y-4 ">
            {categories.map((category, i) => (
              <div key={i} className="">
                <SetCategory men={category.man} woman={category.woman}>
                  <select
                    onChange={(event) =>
                      handleSelectChange(event, category.name)
                    }
                    value={selectedNumbers[category.name] || ''}
                    disabled={selectDisabled[category.name]}
                    className="w-20 text-sm font-medium text-center text-orange-700 bg-orange-200 border border-orange-700 cursor-pointer rounded-xl"
                  >
                    <option value="" disabled={!selectedCategory}>
                      {selectedNumbers[category.name]
                        ? `Nomor ${selectedNumbers[category.name]}`
                        : 'Pilih'}
                    </option>
                    {numbers.map((number) => {
                      const isNumberSelected = selectedFields.some(
                        (field) => field.number === number,
                      );
                      return (
                        <option
                          key={number}
                          value={number}
                          disabled={isNumberSelected}
                        >
                          {number}
                        </option>
                      );
                    })}
                  </select>

                  {selectedFields.some(
                    (field) => field.title === category.name,
                  ) && (
                    <button
                      onClick={() => handleCancel(category.name)}
                      className="px-2 text-xs font-medium text-red-600 bg-red-500 bg-opacity-30 rounded-xl"
                    >
                      Cancel
                    </button>
                  )}
                </SetCategory>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex justify-end px-5 mt-5">
          <ButtonAbuBgt title={'Selanjutnya'} onClick={handleNextClick} />
        </fieldset>
      </section>
    </LayoutRmib>
  );
};

export default Index;
